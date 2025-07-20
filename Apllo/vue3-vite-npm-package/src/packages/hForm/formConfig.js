export const userFormConfig = {
  labelWidth: "120px",
  size: "default",
  statusIcon: true,
  labelPosition: "right",
  inline: false,
  size: "",
  items: [
    {
      type: "input",
      label: "用户名",
      prop: "username",
      placeholder: "请输入用户名",
      rules: [
        { required: true, message: "用户名不能为空", trigger: "blur" },
        { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
      ],
      span: 12,
    },
    {
      type: "input",
      label: "手机号码",
      prop: "phone",
      placeholder: "请输入手机号",
      rules: [
        { required: true, message: "手机号不能为空", trigger: "blur" },
        {
          pattern: /^1[3-9]\d{9}$/,
          message: "手机号格式不正确",
          trigger: "blur",
        },
      ],
      span: 12,
    },
    {
      type: "select",
      label: "用户角色",
      prop: "role",
      placeholder: "请选择角色",
      rules: [{ required: true, message: "请选择角色", trigger: "change" }],
      options: [
        { label: "管理员", value: "admin" },
        { label: "编辑", value: "editor" },
        { label: "普通用户", value: "user" },
      ],
      span: 12,
    },
    {
      type: "date",
      label: "出生日期",
      prop: "birthday",
      attrs: {
        type: "date",
        valueFormat: "YYYY-MM-DD",
      },
      span: 12,
    },

    {
      type: "switch",
      label: "账户状态",
      prop: "status",
      attrs: {
        activeText: "启用",
        inactiveText: "禁用",
      },
      span: 8,
    },
    {
      type: "radio",
      label: "性别",
      prop: "gender",
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
        { label: "保密", value: "unknown" },
      ],
      span: 8,
    },
    {
      type: "number",
      label: "登录次数",
      prop: "loginCount",
      attrs: {
        min: 0,
        max: 100,
      },
      span: 8,
      slots: {
        suffix: "number-prefix",
      },
    },

    {
      type: "checkbox",
      label: "兴趣爱好",
      prop: "hobbies",
      options: [
        { label: "音乐", value: "music" },
        { label: "运动", value: "sports" },
        { label: "阅读", value: "reading" },
        { label: "旅游", value: "travel" },
      ],
      span: 24,
    },
    {
      type: "textarea",
      label: "个人简介",
      prop: "description",
      attrs: {
        rows: 4,
      },
      span: 24,
    },
    {
      type: "slider",
      label: "技能掌握",
      prop: "skillLevel",
      attrs: {
        showInput: true,
        min: 0,
        max: 100,
      },
      span: 24,
    },
  ],
  action: {
    attr: {
      style:{
        width:'100%',
        'justify-content':'end'
      }
    },
    btns: [
      {
        name: "submit",
        label: "提交",
        type: "primary",
        validate: true,
      },
      {
        name: "reset",
        label: "重置",
        type: "info",
      },
    ],
  },
};
