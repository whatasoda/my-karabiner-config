import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import { promisify } from 'util';
import { ComplexModifications, Manipurator, Rule } from './types';

const writeFile = promisify(fs.writeFile);


const Karabiner = (title: string) => {
  const modifications: ComplexModifications = {
    title, rules: []
  }
  
  const rule = (description: string) => {
    const RULE: Rule = { description, manipulators: [] };
    modifications.rules.push(RULE);
    
    const manipurator = (mnprtr: Manipurator) => {
      RULE.manipulators.push(mnprtr);
    }
    
    return { manipurator };
  }
  
  const publish = async (filename: string) => {
    const dir = path.resolve(__dirname, 'dist');
    await new Promise((resolve) => mkdirp(dir, resolve));
    
    filename = /\.json$/i.test(filename) ? filename : `${filename}.json`;
    await writeFile(path.join(dir, filename), JSON.stringify(modifications));
  }
  
  return { rule, publish };
}

export default Karabiner;
