const express = require("express");
const router = express.Router();
const fs = require('fs');
const exists = require('fs').exists

router.get("/video/:id",(req,res) => {
    const id=req.params.id
    console.log('sending video in chunks')
    console.log(id)

    const range = req.headers.range
    const videoPath = `C:\\Users\\ved\\Desktop\\Streamverse\\Server\\Uploads\\${id}`;
    const videoSize = fs.statSync(videoPath).size
    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + chunkSize, videoSize - 1)
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers)
    const stream = fs.createReadStream(videoPath, {
        start,
        end
    })
    stream.pipe(res)
})

router.get("/image/:id", (req,res) => {
    const id=req.params.id;
    console.log("fetching image "+id)

    const imagePath = `C:\\Users\\ved\\Desktop\\Streamverse\\Server\\Uploads\\${id}`;
    
    // Checking if the path exists
    fs.exists(imagePath, (exists) => {
        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain" 
            });
            res.end("404 Not Found");
            return;
        }
        
        
        // Reading the file
        fs.readFile(imagePath,
            function (err, content) {
                // Serving the image
                res.end(content);
            }
        )
    });

})

router.get("/audio/:id",(req,res) => {
    const id=req.params.id
    console.log('sending audio in chunks')
    console.log(id)

    const range = req.headers.range
    const audioPath = `C:\\Users\\smart\\OneDrive\\Desktop\\Streamverse-AVISHKAR\\Streamverse\\Server\\Uploads\\${id}`;
    const audioSize = fs.statSync(audioPath).size
    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + chunkSize, audioSize - 1)
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${audioSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "audio/mpeg"
    }
    res.writeHead(206, headers)
    const stream = fs.createReadStream(audioPath, {
        start,
        end
    })
    stream.pipe(res)
})

module.exports = router;