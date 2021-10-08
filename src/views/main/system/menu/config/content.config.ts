export const contentTableConfig = {
  title: '商品列表',
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  propList: [
    {
      prop: 'name',
      label: '菜单名称',
      minWidth: '100',
      slotName: 'name'
    },
    {
      prop: 'type',
      label: '类型',
      minWidth: '60',
      slotName: 'type'
    },
    {
      prop: 'url',
      label: '菜单url',
      minWidth: '100',
      slotName: 'url'
    },
    {
      prop: 'icon',
      label: '菜单图标',
      minWidth: '100',
      slotName: 'icon'
    },
    {
      prop: 'permission',
      label: '按钮权限',
      minWidth: '100',
      slotName: 'permission'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '160',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '160',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      width: '120',
      slotName: 'handler'
    }
  ]
};
