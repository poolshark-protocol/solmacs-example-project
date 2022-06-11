#[macro_export]

macro_rules! defineLen {
    (true) => {
        uint256 len;
    }
    (false) => {}
}

macro_rules! setLen {
    (one) => {
        len = 1
    }
    () => {}
}

macro_rules! incrementLen {
    (true) => {
        len++
    }
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
            $_codeBlock1
            buffer = wallets[buffer].nextWallet;
        }
    }
    () => {}
}