figma.showUI(__html__)
figma.ui.resize(500, 500)

let Nodes: any[] = [];

for (const node of figma.currentPage.selection) {
    if ('children' in node) {
        node.children.map(child => {
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
}

figma.ui.postMessage(Nodes);