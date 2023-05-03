class TreeStore {
    constructor(items) {
        this.items = items;
        this.itemsMap = new Map();
        this.children = new Map(); // key = item.id  value = array of child
        items.forEach((item) => {
            this.itemsMap.set(item.id, item);
            if (item.parent !== "root") {
                if (!this.children.has(item.parent)) {
                    this.children.set(item.parent, [item]);
                } else {
                    this.children.set(item.parent, [
                        ...this.children.get(item.parent),
                        item,
                    ]);
                }
            }
        });
    }
    getAll() {
        return this.items;
    }
    getItem(id) {
        return this.itemsMap.get(id);
    }
    getChildren(id) {
        if (this.itemsMap.has(id)) {
            return this.children.get(id) || [];
        } else {
            throw new Error(`User with id ${id} does not exist!`);
        }
    }
    getAllChildren(id) {
        if (this.itemsMap.has(id)) {
            const directChildren = this.getChildren(id);
            const grandChildren = directChildren
                .map((directChild) => this.getAllChildren(directChild.id))
                .reduce((grandChildrenArr, res) => {
                    grandChildrenArr.forEach((grandChild) =>
                        res.push(grandChild)
                    );
                    return res;
                }, []);
            return [...directChildren, ...grandChildren];
        } else {
            throw new Error(`User with id ${id} does not exist!`);
        }
    }
    getAllParents(id) {
        if (this.itemsMap.has(id)) {
            const currentItem = this.getItem(id);
            const parent = this.getItem(currentItem.parent);
            return parent ? [parent, ...this.getAllParents(parent.id)] : [];
        } else {
            throw new Error(`User with id ${id} does not exist!`);
        }
    }
}

module.exports = {
    TreeStore,
};
