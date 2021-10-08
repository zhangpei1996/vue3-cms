import { IModal } from '@/components/page-modal';

export const modalConfig: IModal = {
  title: '新建用户',
  labelWidth: '80px',
  formItems: [
    {
      type: 'input',
      field: 'name',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      type: 'input',
      field: 'realname',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      type: 'password',
      field: 'password',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: false
    },
    {
      type: 'input',
      field: 'cellphone',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      type: 'select',
      field: 'departmentId',
      label: '部门',
      placeholder: '请选择部门',
      options: []
    },
    {
      type: 'select',
      field: 'roleId',
      label: '角色',
      placeholder: '请选择角色',
      options: []
    }
  ],
  colLayout: {
    span: 24
  }
};
