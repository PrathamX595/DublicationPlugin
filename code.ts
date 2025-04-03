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

figma.ui.onmessage = async (message) => {
    let csv = message.csvData
    let changableInput = message.textSelections
    let numCols = 5
    let objSpacing = 40
    let copies = parseInt(message.numberOfCopies)
    let itterations = Math.min(copies, csv.length)
    let rows = 0
    itterations % 5 ==0 ? rows = itterations/numCols : rows = Math.floor(itterations/numCols) +1
    let sectionHeight = 0
    let sectionWidth = 0
    itterations >= 5 ? sectionHeight = obj.height*rows + objSpacing * (rows + 1) : sectionHeight = obj.height + objSpacing*2
    itterations >= 5 ? sectionWidth = obj.width*numCols + objSpacing * (numCols+1) : sectionWidth = obj.width * itterations + objSpacing * (itterations + 1)
    let section = figma.createSection()
    section.resizeWithoutConstraints(sectionWidth,sectionHeight)
    section.name = "copies"
    section.fills = [{ type: 'SOLID', color: { r: 0 / 255, g: 0 / 255, b: 0 / 255 },opacity: 0.3 }];
    section.x = obj.x + obj.width + 100
    section.y = obj.y + obj.height + 100
    let nodeXPosition = objSpacing 
    let nodeYPosition = objSpacing 
    let numRows = 1

    const textUpdatePromises = [];
    for (let i = 0; i < itterations; i++) {
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
            if ('children' in newObj) {
                const childPromises = newObj.children.map(async (child) => {
                    if(child.type == "TEXT" ){
                        for (let d = 0; d < changableInput.length; d++) {
                            if (child.name == changableInput[d]) {
                                await Promise.all(
                                    child.getRangeAllFontNames(0, child.characters.length).map(figma.loadFontAsync)
                                )

                                child.characters = csv[i][changableInput[d]]
                                child.textAutoResize = "WIDTH_AND_HEIGHT"
                                child.autoRename = true
                            }
                        }
                    }
                });
                textUpdatePromises.push(...childPromises);
            }
            section.appendChild(newObj) //point to note whenever we appendChild a node into say a section it will change it's inial co-ordinates to the starting point of the parent node
        }
    }

    await Promise.all(textUpdatePromises);
    figma.closePlugin("Duplicates have been created")
}