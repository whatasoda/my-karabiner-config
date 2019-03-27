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

export type ComplexModifications = {
  title: string;
  rules: Rule[];
}

export type Rule = {
  description: string;
  manipulators: Manipurator[];
}

export type Manipurator = {
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

