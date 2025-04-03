figma.showUI(__html__)
figma.ui.resize(500, 500)

let Nodes: any[] = [];

let obj = figma.currentPage.selection[0]

if ('children' in obj) {
    obj.children.map(child => {
        if(child.type == "TEXT"){
            let childNode = {
                id: child.id,
                name: child.name,
                type: child.type,
                visible: child.visible,
                locked: child.locked,
                width: 'width' in child ? child.width : null,
                height: 'height' in child ? child.height : null,
                x: 'x' in child ? child.x : null,
                y: 'y' in child ? child.y : null,
            };
            Nodes.push(childNode)
        }
    });
}

figma.ui.postMessage(Nodes);

figma.ui.onmessage = (message) => {
    let csv = message.csvData
    let numCols = 5
    let objSpacing = 40
    let copies = parseInt(message.numberOfCopies)
    let sectionHeight = 0
    let sectionWidth = 0
    copies >= 5 ? sectionHeight = obj.height*copies/numCols + objSpacing * ((copies/numCols) + 1) : sectionHeight = obj.height + objSpacing*2
    copies >= 5 ? sectionWidth = obj.width*numCols + objSpacing * (numCols+1) : sectionWidth = obj.width * copies + objSpacing * (copies + 1)
    let section = figma.createSection()
    section.resizeWithoutConstraints(sectionWidth,sectionHeight)
    section.name = "copies"
    section.x = obj.x + obj.width + 100
    section.y = obj.y + obj.height + 100
    let nodeXPosition = objSpacing 
    let nodeYPosition = objSpacing 
    let numRows = 1
    for (let i = 0; i < copies; i++) {
        if (obj.type == "FRAME"){
            let newObj = obj.clone()
            newObj.x = nodeXPosition
            newObj.y = nodeYPosition
            if(i < numCols*numRows - 1){
                nodeXPosition += objSpacing + obj.width
            }else{
                nodeYPosition += objSpacing + obj.height
                nodeXPosition = objSpacing 
                numRows++
            }
            section.appendChild(newObj) //point to note whenever we appendChild a node into say a section it will change it's inial co-ordinates to the starting point of the parent node
        }
    }
}