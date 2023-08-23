export const enum ShapeFlags {
  ELEMENT = 1, // 0001
  STATEFUL_COMPONENT = 1 << 1, // 0010
  TEXT_CHILDREN = 1 << 2, // 0100
  ARRAY_CHILDREN = 1 << 3, // 1000
}
/**
 * 位运算
 * | (左右都为0，才为0)  0000 | 0001 -> 0001
 * & (左右都为1，才为1)  0001 & 0001 -> 0001
 * */
