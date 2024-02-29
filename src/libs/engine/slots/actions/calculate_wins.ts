import BigNumber from "bignumber.js";

export class CalculateWins {

    static AddPays( wins :{ pay:BigNumber}[] ) :BigNumber {
        let pay :BigNumber = BigNumber(0);
        wins.forEach( win => {
            pay = pay.plus( win.pay);
        })
        return pay;
    }

}
