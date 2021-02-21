const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let userInRooms = {}

const rooms = ['KT', 'Ball', 'Dick']
const users = ['Vu', 'Phuong', 'Tuyen', 'Hue']
// const room = {
//     room1: [],
//     room2: [],
//     room3: [],
// }

const createRoom = () => {
    rooms.map(room => {
        userInRooms[room] = []
    })
    console.log('USU: ', userInRooms)
}
const handleJoin = (name, roomName) => {
    // Create Object with all room:
    if (roomName in userInRooms) {
        Object.keys(userInRooms).forEach(item => {
            if (userInRooms[item].includes(name)) {
                userInRooms[item] = userInRooms[item].filter(u => u !== name)
            }
        })
        userInRooms[roomName] = [...userInRooms[roomName], name]
    }
    console.log('LIST_ROOM: ', userInRooms);
}

const inputUser = () => {
    rl.question('>> Input name: ', (name) => {
        if (users.includes(name)) {
            rl.question('>> Room join: ', (roomName) => {
                if (rooms.includes(roomName)) {
                    handleJoin(name, roomName)
                    inputUser()
                } else {
                    console.log('Room is invalid!');
                    rl.close()
                }
            })
        } else {
            console.log('Name is invalid!');
            rl.close()
        }

    })
}

const main = () => {
    createRoom()
    inputUser()
}
main()


