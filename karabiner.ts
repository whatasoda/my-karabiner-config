import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

type ModifierName =
  | 'caps_lock'
  | 'left_command'
  | 'left_control'
  | 'left_option'
  | 'left_shift'
  | 'right_command'
  | 'right_control'
  | 'right_option'
  | 'right_shift'
  | 'fn'
  | 'command'
  | 'control'
  | 'option'
  | 'shift'
  | 'any';

type ComplexModifications = {
  title: string;
  rules: Rule[];
}

type Rule = {
  description: string;
  manipulators: Manipurator[];
}

type Manipurator = {
  type: 'basic',
  from: From;
  to?: To[];
  to_if_alone?: To[];
  to_if_held_down?: To[];
  to_after_key_up?: To[];
  to_delayed_action?: {
    to_if_invoked?: To[];
    to_if_canceled?: To[];
  };
  conditions?: any[];
  parameters?: any;
  description?: string;
}

type From = {
  key_code?: string;
  consumer_key_code?: string;
  pointing_button?: string;
  any?: 'key_code' | 'consumer_key_code' | 'pointing_button';
  modifiers?: Partial<{
    mandatory: ModifierName[];
    optional: ModifierName[];
  }>;
  simultaneous?: any;
  simultaneous_options?: any;
};


type To = {
  key_code?: string;
  consumer_key_code?: string;
  pointing_button?: string;
  shell_command?: string;
  select_input_source?: {
    language?: string;
    input_source_id?: string;
    input_mode_id?: string;
  }
  set_variable?: any;
  mouse_key?: any;
  modifiers?: ModifierName[];
  lazy?: boolean;
  repeat?: boolean;
  halt?: boolean;
  hold_down_milliseconds?: number;
};

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
