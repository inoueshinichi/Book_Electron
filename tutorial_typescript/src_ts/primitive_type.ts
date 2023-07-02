/**
 * プリミティブ型の使用例
 */

// 数値型(number) 
// @Note 整数と小数の区別がない. 全てdouble型相当.
{
    const width1 = 5;
    const width2 = 8;
    const height: number = 3;
    const area = (width1 + width2) * height / 2; // 台形計算
    // 19.5が表示される
    console.log(area);

    // 数値リテラル(整数のみサポート)
    const binary = 0b1010; // 2進数リテラル
    const octal = 0o755; // 8進数リテラル
    const hexadecimal = 0xff; // 16進数リテラル
    // 10 493 255と表示される
    console.log(binary, octal, hexadecimal);

    // 指数表記のリテラル
    const big = 1e8;
    const small = 4e-5;
    // 100000000 0.00004と表示される
    console.log(big, small);

    // 区切り表現
    const million = 1_000_000;
    console.log(million);
}

// 任意精度整数(BigInt)
// @Note above ES2020
// @Note number(double)の方が約60倍高速
// @Warn 古いブラウザでは利用できない
// @Warn 普通の数値と混ぜて利用するこはできない
{
    // 数値の末尾の`n`をつける
    const bignum: bigint = (123n + 456n) * 2n;
    console.log(bignum);

    // 計算結果の小数は丸められる
    const result: bigint = 5n / 2n;
    console.log(result); // 2nと表示される

    // Error : 普通の数値と混ぜて利用するこはできない
    // const wrong: bigint = 100n + 50;
}

// 文字列型と3種類の文字列リテラル
{
    // 文字列リテラル
    const str1: string = "Hello";
    const str2: string = 'world!';
    console.log(str1 + "," + str2);

    // テンプレートリテラル`template`
    const message: string = `Hello,
    world!`;
    console.log(message);
    const tmp1: string = "Hello";
    const tmp2: string = "world!";
    console.log(`${tmp1}, ${tmp2}`);
    console.log(`123 + 456 = ${123 + 456}`); // 579

    // エスケープシーケンス`\`
    console.log("Hello \\world/"); // Hello \world/

    // JavaScriptの文字コードはUTF-16
    console.log("Hello \u{796d} world!"); // Hello 祭 world!
}

// 真理値と真理値リテラル
{
    const no: boolean = false;
    const yes: boolean = true;
    console.log(yes, no); // true false
}

// nullとundefined
// null,undefined自体が名前
// undefinedの利用を推奨
{
    const val1 = null;
    const val2 = undefined;
    console.log(val1, val2);

    // 型でもあり値でもある
    const n: null = null;
    const u: undefined = undefined;

    
}
