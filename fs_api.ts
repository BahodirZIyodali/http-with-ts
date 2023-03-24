import * as fs from 'fs';

const read_file = (file_name: string): any => {
  return JSON.parse(fs.readFileSync(`./module/${file_name}`, 'utf-8'));
}

const write_file = (file_name: string, data: any): void => {
  fs.writeFileSync(`./module/${file_name}`, JSON.stringify(data, null, 4));
}

export { read_file, write_file };
