import * as http from 'http';
import { read_file, write_file } from './fs_api';
import { v4 as uuid } from 'uuid';

const PORT: number = 2000;


const userApp = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const userId: string | undefined = req.url?.split('/')[2];

    if (req.method === 'GET') {
        if (req.url === '/users') {
            const users: any[] = read_file('users.json');
            res.end(JSON.stringify(users));
        }

        if (req.url === `/users/${userId}`) {
            const oneUser: any = read_file('users.json').find((u: any) => u.id === userId);

            if (!oneUser) {
                return res.end('User not found!');
            }

            res.end(JSON.stringify(oneUser));
        }
    }

    if (req.method === 'POST') {
        if (req.url === '/users') {
            req.on('data', (chunk: Uint8Array) => {
                const users: any[] = read_file('users.json');
                const newUser: any = JSON.parse(chunk.toString());

                users.push({
                    id: uuid(),
                    ...newUser,
                });
                write_file('users.json', users);
                res.end(JSON.stringify('OK'));
            });
        }
    }

    if (req.method === 'DELETE') {
        if (req.url === `/users/${userId}`) {
            let users: any[] = read_file('users.json');

            const getOne: any = users.find((u: any) => u.id === userId);

            if (!getOne) {
                return res.end('users not found!');
            }

            users.forEach((u: any, idx: number) => {
                if (u.id === userId) {
                    users.splice(idx, 1);
                }
            });

            write_file('users.json', users);
            res.end('Deleted users!');
        }
    }
    if (req.method === 'PUT') {
        if (req.url === `/users/${userId}`) {
            req.on('data', (chunk: Uint8Array) => {
                const updateUser: any = JSON.parse(chunk.toString());

                let users: any[] = read_file('users.json');

                const getOne: any = users.find((f: any) => f.id === userId);

                if (!getOne) {
                    return res.end('users not found!');
                }

                users.forEach((user: any) => {
                    if (user.id === userId) {
                        user.name = updateUser.name;
                        user.username = updateUser.username;
                        user.email = updateUser.email;
                    }
                });

                write_file('users.json', users);

                res.end('Updated users!');
            });
        }
    }
});

userApp.listen(PORT, () => {
    console.log(`server running ${PORT}`);
});
