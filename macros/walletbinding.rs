#[macro_export]

macro_rules! FLAG_EMPTY  {
    () => { 0 };
}

macro_rules! FLAG_ADDED  {
    () => { 1 };
}

macro_rules! FLAG_JOINED {
    () => { 2 };
}

macro_rules! defineLen {
    (true) => {uint256 len;}
    (false) => {}
}

macro_rules! setLen {
    (one) => {len = 1}
    () => {}
}

macro_rules! incrementLen {
    (*) => {len++}
    (false) => {}
}

macro_rules! setBalancesAndWallets {
    () => {
        _balances = new uint256[](len);
        _wallets = new address[](len);
    }
}

macros_rules! bufferLoop {
    () => {
        _balances[i] = wallets[buffer].balance;
        _wallets[i] = buffer;
        buffer = wallets[buffer].nextWallet;
    }
}

macro_rules! sumBufferBalance {
    () => {
        collectiveBalance += wallets[buffer].balance;
    }
}

macro_rules! returnBalance {
    (single, $wallet) => {
        return wallets[$wallet].balance;
    }
    (multiple, $wallet) => {
        return collectiveBalance;
    }
}

macro_rules! returnWallets {
    (single, $wallet) => {
        _wallets = new address[](1);
        _wallets[0] = $wallet;
        return _wallets;
    }
}

macro_rules! returnBalancesAndWallets {
    (single, $wallet) => {
        _balances = new uint256[](1);
        _wallets = new address[](1);
        _balances[0] = wallets[$wallet].balance;
        _wallets[0] = $wallet;
        return (_balances, _wallets);
    }
}

macro_rules! handleWalletBuffer {
    ($codeBlock1) => {
        // increment buffer, so `buffer == aWalletInList`
        buffer = wallets[buffer].nextWallet;

        for (uint256 i; wallets[buffer].nextWallet != aWalletInList; i++) {
            $_codeBlock3
            buffer = wallets[buffer].nextWallet;
        }
    }
    () => {}
}

macro_rules! linkWallet {
    ($_wallet, $_newFlag, $_joinFlag, $_addFlag) => {
        address wallet0 = msg.sender > $_wallet ? msg.sender : $_wallet;
        address wallet1 = msg.sender > $_wallet ? $_wallet : msg.sender;

        uint256 status = walletStatuses[wallet0][wallet1];

        if (status == $_newFlag) {   
            // nothing to update
            return (false, false);
        }
        if (status == $_joinFlag) {
            // delete entry in mapping
            walletStatuses[wallet0][wallet1] = FLAG_JOINED!;

            wallets[_wallet].nextWallet = wallets[msg.sender].nextWallet == address(0)
                ? msg.sender
                : wallets[msg.sender].nextWallet;
            wallets[msg.sender].nextWallet = _wallet;
            return (true, false);
        }
        if (status == $_addFlag) {
            walletStatuses[wallet0][wallet1] = FLAG_ADDED!;
            return (false, true);
        }
        return (false, false);
    }
}

macro_rules! getWalletInList {
    ($_wallet, $_codeEndList, $_codeBlock1, $_codeBlock2, $_codeBlock3, $_lenFlag) => {
        if (wallets[$_wallet].nextWallet == address(0)) {
            $_codeEndList
        }

        // ? NOTE: The impl here is unused, but left here as an example of a line or block of code
        // That may or may not be used in some impls
        defineLen($_lenFlag)!

        address buffer = $_wallet;
        // get the len of the array
        for (setLen!($_lenFlag); wallets[buffer].nextWallet != $_wallet; incrementLen!($_lenFlag)) {
            $_codeBlock1
            buffer = wallets[buffer].nextWallet;
        }

        $_codeBlock2

        handleWalletBuffer($_codeBlock3)
    }
}