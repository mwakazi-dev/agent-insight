export const FORM_INPUTS = [
  {
    name: "email",
    label: "Email",
    required: true,
    type: "email",
    rules: [{ required: true, message: "Please input your username!" }],
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    rules: [{ required: true, message: "Please input your password!" }],
  },
];
