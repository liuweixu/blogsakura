// 使用@sapphire/snowflake库示例
import { Snowflake } from "@sapphire/snowflake";
//雪花算法时间戳
const epoch = new Date("2020-01-01T00:00:00Z").getTime();
// 雪花算法生成id
const snowflake = new Snowflake(epoch);
const id = snowflake.generate();
console.log(id.toString());
