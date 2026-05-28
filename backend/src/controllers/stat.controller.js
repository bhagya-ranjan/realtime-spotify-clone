import { Song } from "../models/song.model.js";
import { User }  from "../models/user.model.js";
import { Album } from "../models/album.model.js";   

export const getStats = async (req, res , next)=>{
    try{

        // const totalSongs = await Song.countDocuments();
        // const totalUsers = await User.countDocuments();
        // const totalAlbums = await Album.countDocuments();

        //this way it runs one by one , do this shown below

        const [totalSongs , totalAlbums , totalUsers , uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),


            //fetch all songs
            Song.aggregate([
                {
                    //fetch all albums and combine them (song and album)
                    $unionWith : {
                        coll : "albums",
                        pipeline : [],
                    },
                },
                //group them with unique artist
                {
                    $group : {
                        _id : "$artist",
                    },
                },
                {
                    $count : "count",
                },
            ]),
        ]);

        res.status(200).json({
            totalAlbums,
            totalSongs,
            totalUsers,
            totalArtists : uniqueArtists[0]?.count || 0,
        })

    }catch(error){
        next(error);
    }
};