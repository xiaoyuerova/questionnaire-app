export default function json_to_obj(arr:Array<string>){
    /**
     * json对象解析
     * @param arr 对象的json字符串列表
     * @return 对象列表
     */
    const data = []
    for (let i = 0; i < arr.length; i++) {
        data.push(JSON.parse(arr[i]))
    }
    return data
}