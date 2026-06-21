export interface IRuleConfig {
  args?: any[];
  msg?: string;
  type?: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';
}

export interface IRulesConfig {
  type?: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';
  global?: Record<string, IRuleConfig>;
  [fieldName: string]: Record<string, IRuleConfig>;
}

export interface IRepeaterConfig {
    btnAddVariant?: string;
    btnAddTexture?: string;
    btnAddClean?: boolean;
    btnRemoveVariant?: string;
    btnRemoveTexture?: string;
    btnRemoveClean?: boolean;
    noTexture?: boolean;
}

export interface IColConfig {
    tag?: string;
    cols?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
}

export interface IMaskConfig {};

export interface IInputConfig {
    value?: string | number;
    formatter?: (value: any, event: Event) => string;
    state?: boolean | null;
    mask?: string | Record<string, IMaskConfig>;
    limit?: number | string;
    [key: string]: any;
}

export type VueClassBinding = string | Record<string, boolean> | Array<string | Record<string, boolean>>;

export interface IBlockConfig {
    id?: string;
    label?: string;
    labelAlign?: string;
    labelClass?: VueClassBinding;
    invalidFeedBack?: string;
    state?: boolean | null;
    labelSrOnly?: boolean;
    labelFor?: boolean | string;
    description?: string;
    descriptionClass?: VueClassBinding;
}

export interface IEventsConfig {
    [eventName: string]: (...args: [...eventArgs: any[], formData: any]) => void;
}

export interface IFormsConfig {
    formKey?: string | number;
    label?: string;
    dependent?: boolean;
    form?: Record<string, any>;
    component?: string;
    colProps?: IColConfig;
    iProps?: IInputConfig;
    inputBlockProps?: IBlockConfig;
    labelFor?: string | boolean;
    model?: string;
    back?: string;
    events?: IEventsConfig;
}

export interface IDslSelectOption {
  label: string;
  value: any;
  [key: string]: any;
}

export type TypeDSL = [string, IDslSelectOption[]]

export interface IFormBlocksGroup {
    key?: string | number;
    title?: string;
    noTitle?: boolean;
    groupModel?: string;
    groupFormData?: Record<string, any>;
    isRepeater?: boolean;
    repeaterProps?: IRepeaterConfig;
    dependent?: boolean;
    forms: Array<string | TypeDSL | IFormsConfig>;
    rules?: IRulesConfig;
}

export type TypeDefineGroupBase = (groups: IFormBlocksGroup[]) => IFormBlocksGroup[];

export interface IUseFormHandle {
    defineGroupBase: TypeDefineGroupBase;
    makeGroups: (
      backVars: Record<string, any>, 
      groupBase: IFormBlocksGroup[], 
      groupProps: any, 
      options?: { parse?: Function }
    ) => any;
}

export function useFormHandle(): IUseFormHandle;