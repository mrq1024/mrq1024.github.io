---
sidebar: false
editLink: false
---

## 冒泡排序
比较所有相邻的两个项，如果第一个比第二个大，则交换它们.

冒泡排序采用两层`for`循环.
- 第一层循环:控制数组排序的轮数
- 第二层循环:对比数组中相邻的两项,并进行排序

```javascript
function bobbleSort(array,compareFn = defaultCompare){
    let {length} = array;
    for(let i = 0; i < length;i++){
        for(let j = 0; j < length - 1 - i;j++){
            if(compareFn(array[j],array[j + 1]) === 1){
                swap(array,j,j + 1);
            }
        }
    }
    return array;
}

//交换函数
function swap(array,a,b){
    [array[a],array[b]] = [array[b],array[a]];
}

// 比较函数
function compareFn(a,b){
    return a > b?0:1
}

```
