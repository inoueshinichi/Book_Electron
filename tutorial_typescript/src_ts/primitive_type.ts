/**
 * プリミティブ型の使用例
 */

// 数値型(number) 整数と小数の区別がない. 全てdouble型相当.
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

