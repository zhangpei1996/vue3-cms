type IFormType = 'input' | 'password' | 'select' | 'datepicker';

export interface IFormItem {
  type: IFormType;
  field: string;
  label: string;
  rules?: any[];
  placeholder?: any;
  options?: any[];
  otherOptions?: any;
  isHidden?: boolean;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemStyle?: any;
}
