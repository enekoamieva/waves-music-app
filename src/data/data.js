import { v4 as uuidv4 } from "uuid";

function rockMusic() {
    return [
        {
            name: "Sympathy for the Devil",
            cover:
                "https://www.nacionrock.com/wp-content/uploads/The-Rolling-Stones.jpg",
            artist: "The Rolling Stones",
            audio: "https://enekoamieva.com/musica/sympathyforthedevil.mp3",
            color: ["#E6C693", "#C52525"],
            id: uuidv4(),
            active: false,
        },
        {
            name: "Rock the Casbah",
            cover:
                "https://img.discogs.com/_e8Lrc1W01_pK21AQRy182aD3Pw=/fit-in/600x601/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-215726-1586348057-1385.jpeg.jpg",
            artist: "The Clash",
            audio: "https://enekoamieva.com/musica/rockthecasbah.mp3",
            color: ["#D4061B", "#333"],
            id: uuidv4(),
            active: false,
        },
        {
            name: "Wrong'Em Boyo",
            cover:
                "https://johntomsett.files.wordpress.com/2019/12/r-378698-1407158809-2608.jpeg.jpg",
            artist: "The Clash",
            audio: "https://enekoamieva.com/musica/wrongemboyo.mp3",
            color: ["#F49AB6", "#01AF68"],
            id: uuidv4(),
            active: false,
        },
        {
            name: "The real me",
            cover:
                "https://upload.wikimedia.org/wikipedia/en/8/8a/Quadrophenia_%28album%29.jpg",
            artist: "The Who",
            audio: "https://enekoamieva.com/musica/therealme.mp3",
            color: ["#333", "#696969"],
            id: uuidv4(),
            active: false,
        },
        //ADD MORE HERE
    ];
}

export default rockMusic;