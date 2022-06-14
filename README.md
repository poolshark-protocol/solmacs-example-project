# Solmacs

This project demonstrates a simple use case for Solmacs, a Rust-style macro preprocessor built for use in the Solidity smart contract language.


The project comes with a sample contract, both the original and a template file with macros, and the core Solmacs package to preprocess the macros for code placement.


# Template File


A Template File will contain your Solidity code as well as some usage of the `!macro_rules` defined in the Macro Files.


Usage:
```
macroName!(arg1, arg2)
```


Here is an example in this project:
```
    function listWallets(
        address wallet
    ) external view returns (address[] memory _wallets) {
        getWalletInList!(
            wallet,
            returnBalance!(single, wallet),
            ,
            _wallets = new address[](len),
            _wallets[i] = buffer;,
            true,
        );

        return _wallets;
    }
``` 

Notice here that you have also define macros as args for other macros.

# Macro File

Macro files consist of rules that are defined to be reused through Template Files as well as Macro Files.

```
macro_rules! incrementLen {
    (true) => {
        len++
    }
    (false) => {}
}
```

By passing `true` to this macro rule the output will be:
```
len++
```
where as passing `false` will return an empty string

`true` and `false` here represent the Match Expression, which is used to decide which Macro Case(s) to match on.

