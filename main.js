class HashMap {
    
    bucketLimit = 16;
    buckets = Array(this.bucketLimit);
    loadFactor = 0.75;
    capacity = 0;

    hash(key) {
        if (key === null || key === undefined) {
            throw new Error("Please enter a valid key");
        }

        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i))%this.bucketLimit;
        }
        
        return hashCode;
    } 

    set(key, value) {

        if (this.capacity >= this.bucketLimit*this.loadFactor) {
            this.bucketLimit *= 2;
            let newBuckets = new Array (this.bucketLimit);
            const entries = this.entries();
            this.buckets = newBuckets;
            entries.forEach(element => {
                this.set(element[0], element[1]);
            });
        }

        let hashCode = this.hash(key); //hashCode is also the index for the buckets
        let newData = new Node(hashCode, key, value);

        if (hashCode < 0 || hashCode >= this.buckets.length) { //places bounds on the buckets
            throw new Error("Trying to access index out of bound");
        }



        if (!this.buckets[hashCode]) {
            this.buckets[hashCode] = newData;
        }
        else {
            let curr = this.buckets[hashCode];
            while (curr.next !== null){
                curr = curr.next;
            }
            curr.next = newData;
        }

        this.capacity += 1;



    }

    get(key) {
        let hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.buckets.length) { //places bounds on the buckets
            throw new Error("Trying to access index out of bound");
        }

        let head = this.buckets[hashCode];

        if (head) {
            let curr = head;
            while (curr !== null) {
                if (curr.key === key) {
                    return curr.value;
                }
                curr = curr.next;
            }
            return null;
        }
    }

    has(key) {
        let hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.buckets.length) { //places bounds on the buckets
            throw new Error("Trying to access index out of bound");
        }
        let head = this.buckets[hashCode];
        if (head) {
            let curr = head;
            while (curr !== null) {
                if (curr.key === key) {
                    return true;
                }
                curr = curr.next;
            }
        }
        return false;
    }

    remove(key) {
        let hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.buckets.length) { //places bounds on the buckets
            throw new Error("Trying to access index out of bound");
        }
        let head = this.buckets[hashCode];

        if (head) {
            let curr = head;
            while (curr !== null) {
                if (key === head.key) { //if curr is the first node (head)
                    if (curr.next === null) {
                        this.buckets[hashCode] = null;
                        this.capacity -= 1;
                        return true;
                    }
                    else {
                        this.buckets[hashCode] = head.next;
                        this.capacity -= 1;
                        return true;
                    }
                }
                else if (curr.next.key === key) {
                    if (curr.next.next !== null) {
                        curr.next = curr.next.next;
                        this.capacity -= 1;
                        return true;
                    }
                    else {
                        curr.next = null;
                        this.capacity -= 1;
                        return true;
                    }
                }
                curr = curr.next;
            }
        }
        return false;
    }

    length () {
        return this.capacity;
    }

    clear () {
        this.bucketLimit = 16;
        this.capacity = 0;
        this.buckets = new Array (this.bucketLimit);
    }

    keys () {
        let array = [];
        for (let i = 0; i <= this.buckets.length; i++) {
            let head = this.buckets[i];
            if (head) {
                let curr = head;
                while (curr !== null) {
                    array.push(curr.key);
                    curr = curr.next;
                }
            }
        }
        return array;
    }

    values () {
        let array = [];
        for (let i = 0; i <= this.buckets.length; i++) {
            let head = this.buckets[i];
            if (head) {
                let curr = head;
                while (curr !== null) {
                    array.push(curr.value);
                    curr = curr.next;
                }
            }
        }
        return array;
    }

    entries () {
        let array = [];
        for (let i = 0; i <= this.buckets.length; i++) {
            let head = this.buckets[i];
            if (head) {
                let curr = head;
                while (curr !== null) {
                    const entry = [curr.key, curr.value];
                    array.push(entry);
                    curr = curr.next;
                }
            }
        }
        return array;
    }
}

class Node {
    constructor (hashCode, key, value, next = null) {
        this.hashCode = hashCode;
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

let test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver');

console.log(test.buckets);