const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) { 
    
        if (this.length == 0) {
            this._head = new Node(data);
            this._tail = this._head;
            this.length++;
            return this;
        } 
        
        if (this.length == 1) {
            this._tail = new Node(data, this._head, null);
            this._head.next = this._tail;
            this.length++;
            return this;
        }

        let obj = new Node(data, this._tail, null);
        this._tail.next = obj;
        this._tail = obj;
        this.length++;
        return this;
    }

    head() {
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._tail ? this._tail.data : null;
    }

    at(index) {
        let item = null;
        
        if (this.length == 0) throw new Error("List is empty");

        if (index < this.length / 2) {
            item = this._head;
            for (let i = 0; i < index; i++) {
                item = item.next;  
            }

        } else {
            item = this._tail;
            
            for (let i = 0; i < this.length - index - 1; i++) {
                item = item.prev;  
            }

        }

        if (arguments[1]) {
            return item;
        }

        return item.data;
    }

    insertAt(index, data) {

        if (index == 0 && this.length == 0) {
            this.append(data);
            return this;
        }

        let item = this.at(index, true);    
        let prev = item.prev;
        let obj = new Node(data, prev, item);

        if (prev) {
            prev.next = obj;
        }

        item.prev = obj;

        this.length++;
        return this;
    }
    
    isEmpty() {
        return !this.length;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }
    
    deleteAt(index) {
        let item = this.at(index, true);

        if (this.length == 1) {
            return this.clear();
        }

        let prev = item.prev;
        let next = item.next;
        
        if (prev && next) {
            prev.next = next;
            next.prev = prev;
        }

        if (!prev) {
            next.prev = null;
            this._head = next;
        }
        
        if (!next) {
            prev.next = null;
            this._tail = prev;
        }

        this.length--;
        return this;
    }
    
    reverse() {
        let item = Object.assign({}, this._head);
        let temp = null;

        for (let i = 0; i < this.length; i++) {
            temp = item.next;
            item.next = item.prev;
            item.prev = temp;
            
            if (i == 0) {
                this._tail = item;
            
            } else if (i == this.length - 1) {
                this._head = item;
            }
            
            item = item.prev;
        }
        return this;
    }
    
    indexOf(data) {
        let item = this._head;
        
        for (let i = 0; i < this.length; i++) {
            if (item.data == data) return i;
            item = item.next;
        }

        return -1;
    }
}

module.exports = LinkedList;
