# eslint

per default all rules are disabled, have to enable some.
see current configuration w/ `--print-config`.
minimal configuration could be:

```json
{
  "extends": ["eslint:recommended"]
}
```

# prettier

to prevent conflicts disable formatting-related rules add
`eslint-config-prettier` as last rule.
f.e. this disables `no-unexpected-multiline`, `no-mixed-spaces-and-tabs` and
`no-extra-semi`.

```json
{
  "extends": ["eslint:recommended", "prettier"]
}
```

or even add errors from prettier as eslint errors w/ `eslint-plugin-prettier`.
this already extends aforementioned `prettier`.

```json
{
  "extends": ["eslint:recommended", "plugin:prettier/recommended"]
}
```
