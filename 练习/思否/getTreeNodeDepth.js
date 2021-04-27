const treeNode = [{
        "id": "1121",
        "children": [{
                "id": "1120",
                "children": [{
                    "id": "1119",
                    "children": null,
                }]
            },
            {
                "id": "118",
                "children": null,
            },
            {
                "id": "117",
                "children": null,
            }
        ],
    },
    {
        "id": "116",
        "children": [{
            "id": "115",
            "children": null,
        }],
    },
    {
        "id": "1114",
        "children": [{
                "id": "113",
                "children": [{
                        "id": "112",
                        "children": null,
                    },
                    {
                        "id": "0003",
                        "children": [{
                            "id": "0002",
                            "children": [{
                                "id": "0002",
                                "children":[]
                            }],
                        }],
                    }
                ],
            },
            {
                "id": "007",
                "children": null,
            }
        ],
    }
];

// 得到嵌套数据结构的最深层级
function getDepth(nodes){
    if(nodes.length == 0) return 0;

    let len = nodes.length;
    let depth = 0;
    for(let i = 0;i<len;i++){
        let node = nodes[i];
        if(node.children && node.children.length>0){
            depth = Math.max(1 + getDepth(node.children),depth+1) ;
        }
    }
    return depth;
}

