//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Contract {
    struct WalletBalance {
        uint256 balance;
        address nextWallet;
    }

    uint256 internal constant FLAG_ADDED = 1;
    uint256 internal constant FLAG_JOINED = 2;
    mapping(address => WalletBalance) internal wallets;
    mapping(address => mapping(address => uint256)) internal pendingWallets;

    function addWallet(
        address walletToAdd
    ) external returns (bool /*succes*/, bool /*pendingAuth*/) {
        address wallet0 = msg.sender > walletToAdd ? msg.sender : walletToAdd;
        address wallet1 = msg.sender > walletToAdd ? walletToAdd : msg.sender;

        uint256 status = pendingWallets[wallet0][wallet1];

        if (status == FLAG_ADDED) {
            // undefined behaviour
            return (false, false);
        }
        if (status == FLAG_JOINED) {
            delete pendingWallets[wallet0][wallet1];

            wallets[walletToAdd].nextWallet = wallets[msg.sender].nextWallet == address(0)
                ? msg.sender
                : wallets[msg.sender].nextWallet;
            wallets[msg.sender].nextWallet = walletToAdd;
            return (true, false);
        }
        if (status == 0) {
            pendingWallets[wallet0][wallet1] = FLAG_ADDED;
            return (false, true);
        }
        return (false, false);
    }

    function joinWallet(
        address walletToJoin
    ) external returns (bool succes, bool pendingAuth) {
        address wallet0 = msg.sender > walletToJoin ? msg.sender : walletToJoin;
        address wallet1 = msg.sender > walletToJoin ? walletToJoin : msg.sender;

        uint256 status = pendingWallets[wallet0][wallet1];

        if (status == FLAG_ADDED) {
            delete pendingWallets[wallet0][wallet1];

            wallets[walletToJoin].nextWallet = wallets[msg.sender].nextWallet == address(0)
                ? msg.sender
                : wallets[msg.sender].nextWallet;
            wallets[msg.sender].nextWallet = walletToJoin;
            return (true, false);
        }
        if (status == FLAG_JOINED) {
            // undefined behaviour
            return (false, false);
        }
        if (status == 0) {
            pendingWallets[wallet0][wallet1] = FLAG_JOINED;
            return (false, true);
        }
        return (false, false);
    }

    function listWallets(
        address aWalletInList
    ) external view returns (address[] memory _wallets) {
        if (wallets[aWalletInList].nextWallet == address(0)) {
            _wallets = new address[](1);
            _wallets[0] = aWalletInList;
            return _wallets;
        }

        uint256 len;

        address buffer = aWalletInList;
        // get the len of the array
        for (len = 1; wallets[buffer].nextWallet != aWalletInList; len++) {
            buffer = wallets[buffer].nextWallet;
        }

        // set the len of the array
        _wallets = new address[](len);

        // increment buffer, so `buffer == aWalletInList`
        buffer = wallets[buffer].nextWallet;
        for (uint256 i; wallets[buffer].nextWallet != aWalletInList; i++) {
            _wallets[i] = buffer;
            buffer = wallets[buffer].nextWallet;
        }

        return _wallets;
    }

    function getBalance(
        address wallet
    ) external view returns (uint256) {
        return wallets[wallet].balance;
    }

    function getListBalanceCollective(
        address aWalletInList
    ) external view returns (uint256 collectiveBalance) {
        (uint256[] memory _balances, ) = _getListBalance(aWalletInList);

        for (uint256 i; i < _balances.length; i++) {
            collectiveBalance += _balances[i];
        }

        return collectiveBalance;
    }

    function getListBalanceArray(
        address aWalletInList
    ) external view returns (uint256[] memory _balances, address[] memory _wallets) {
        return _getListBalance(aWalletInList);
    }

    function _getListBalance(
        address aWalletInList
    ) internal view returns (uint256[] memory _balances, address[] memory _wallets) {
        if (wallets[aWalletInList].nextWallet == address(0)) {
            _balances = new uint256[](1);
            _wallets = new address[](1);
            _balances[0] = wallets[aWalletInList].balance;
            _wallets[0] = aWalletInList;
            return (_balances, _wallets);
        }

        uint256 len;

        address buffer = aWalletInList;
        // get the len of the array
        for (len = 1; wallets[buffer].nextWallet != aWalletInList; len++) {
            buffer = wallets[buffer].nextWallet;
        }

        // set the len of the array
        _balances = new uint256[](len);
        _wallets = new address[](len);

        // increment buffer, so `buffer == aWalletInList`
        buffer = wallets[buffer].nextWallet;
        for (uint256 i; wallets[buffer].nextWallet != aWalletInList; i++) {
            _balances[i] = wallets[buffer].balance;
            _wallets[i] = buffer;
            buffer = wallets[buffer].nextWallet;
        }

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
