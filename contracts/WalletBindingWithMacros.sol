//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

#use "./macros/walletbinding.rs";

contract WalletBindingWithMacros {
    struct WalletBalance {
        uint256 balance;
        address nextWallet;
    }

    mapping(address => WalletBalance) internal wallets;
    mapping(address => mapping(address => uint256)) internal walletStatuses;

    function addWallet(
        address walletToAdd
    ) external returns (bool /*joined*/, bool /*added*/) {
        linkWallet!(walletToAdd, FLAG_ADDED!, FLAG_JOINED!, FLAG_EMPTY!);
    }

    function joinWallet(
        address walletToJoin
    ) external returns (bool joined, bool added) {
        linkWallet!(walletToAdd, FLAG_JOINED!, FLAG_ADDED!, FLAG_EMPTY!);
    }

    function listWallets(
        address wallet
    ) external view returns (address[] memory _wallets) {
        getWalletInList!(
            wallet,
            returnBalance!(single, wallet),
            ,
            _wallets = new address[](len);,
            _wallets[i] = buffer;,
            true,
        )

        return _wallets;
    }

    function getBalance(
        address wallet
    ) external view returns (uint256) {
        return wallets[wallet].balance;
    }

    function getListBalanceCollective(
        address wallet
    ) external view returns (uint256 collectiveBalance) {
        getWalletInList!(
            wallet,
            returnBalance!(single, wallet),
            sumBufferBalance!(),
            returnBalance!(multiple, wallet)
            false
        )
    }

    function getListBalanceArray(
        address wallet
    ) external view returns (uint256[] memory _balances, address[] memory _wallets) {
        getWalletInList!(
            wallet,
            returnBalancesAndWallets!(single),
            ,
            setBalancesAndWallets!,
            bufferLoop!,
            true
        )

        return (_balances, _wallets);
    }

    function deposit(
        uint256 amount
    ) external returns (bool) {
        if (wallets[msg.sender].balance + amount < wallets[msg.sender].balance) return false;

        wallets[msg.sender].balance += amount;
        return true;
    }

    function withdraw(
        uint256 amount
    ) external returns (bool) {
        if (amount > wallets[msg.sender].balance) return false;

        wallets[msg.sender].balance -= amount;
        return true;
    }
}
