import { Storyboard } from "../src";
import fs from "fs";

const osb = fs.readFileSync(
    './example.osb',
    'utf-8'
)

const sb = new Storyboard(osb);

fs.writeFileSync(
    './example-parsed.osb',
    sb.toString(),
    'utf-8',
)

const oldSb = new Storyboard();

const newSb = oldSb.parse(osb);

if(newSb) {
    fs.writeFileSync(
        './example-parsed-2.osb',
        newSb.toString(),
        'utf-8',
    )
}

