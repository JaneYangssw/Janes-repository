// state: originList, originSelected, targetList, targetSelected
// action: {type:'move'|'select'|'single',direction:'left'|'right',payload:key}

// 设置初始数据
const str = 'ABCD'
const arr = str.split('').map(el => ({ [el]: 'This is Para ' + el }))
export const defaultValue = {
    originList: arr,
    originSelected: [],
    targetList: [],
    targetSelected: []
}

export function reducer(state, action) {
    // 通过 direction 判断移动方向
    let originKey, targetKey, selectedKey
    if (action.direction === 'right') {
        originKey = 'originList'
        targetKey = 'targetList'
        selectedKey = 'originSelected'
    } else {
        originKey = 'targetList'
        targetKey = 'originList'
        selectedKey = 'targetSelected'
    }
    switch (action.type) {
        // 移动已选
        case 'move':
            console.log('批量移动')
            const items = state[originKey].filter((_, key) => state[selectedKey].includes(key))
            state[targetKey] = [...state[targetKey], ...items]
            state[originKey] = state[originKey].filter((_, key) => !state[selectedKey].includes(key))
            state[selectedKey] = []
            return { ...state }
        // 点选高亮
        case 'select':
            console.log('点选高亮')
            const exist = state[selectedKey].includes(action.payload)
            if (exist) {
                state[selectedKey] = state[selectedKey].filter(el => el !== action.payload)
            } else {
                state[selectedKey] = [...state[selectedKey], action.payload]
            }
            return { ...state }
        case 'single':
            console.log('移动单个')
            state[targetKey] = [...state[targetKey], state[originKey][action.payload]]
            state[originKey] = state[originKey].filter((_, key) => key !== action.payload)
            state[selectedKey] = []
            console.log(state)
            return { ...state }
        default:
            return state
    }
}