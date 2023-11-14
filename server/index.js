import {Server} from "socket.io";

const io = new Server({
        cors: {
            origin: "http://localhost:5173"
        },
    }
);

io.listen(3001);

const characters = [];

const generateRandomPosition = () => {
    return [Math.random() * 10, 0, Math.random() * 10];
};

const generateRandomHexColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

io.on("connection", (socket) => {
    console.log("User connected!");

    characters.push({
        id: socket.id,
        position: generateRandomPosition(),
        hairColor: generateRandomHexColor(),
        topColor: generateRandomHexColor(),
        bottomColor: generateRandomHexColor()
    });

    socket.emit("hello");

    io.emit("characters", characters)

    socket.on("disconnect", () => {
        console.log("User Disconnected.!")

        characters.splice(
            characters.findIndex((characters) => characters.id === socket.id),
            1
        )
    })
});