export const rules = {
  name: [
    { required: true, message: '用户名是必传内容', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,12}$/,
      message: '用户名必须是6-12位字母或数字',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '密码是必传内容', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,}$/,
      message: '密码必须是6位以上的字母或数字',
      trigger: 'change'
    }
  ]
};
