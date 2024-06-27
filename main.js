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

        // if(this.capacity >= this.bucketLimit*this.loadFactor) { //if the bucket is at the load limit (75%) resize
        //     this.bucketLimit *= 2;
        //     let newBucketList = new Array(this.bucketLimit);
        //     for (let i = 0; i <= this.buckets.length; i++) {
        //         newBucketList[i] = this.buckets[i];
        //     }
        //     this.buckets = newBucketList;
        // }

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

        for (let i = 0; i <= this.buckets.length; i++) {
            let node = this.buckets[i];
            if (node && node.hashCode === hashCode) {
                let curr = node;
                while (curr !== null) {
                    if (curr.key === key) {
                        return curr.value;
                    }
                    curr = curr.next;
                }
                return null;
            }            
        }
    }

    has(key) {
        let hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.buckets.length) { //places bounds on the buckets
            throw new Error("Trying to access index out of bound");
        }
        for (let i = 0; i <= this.buckets.length; i++) {
            let node = this.buckets[i];
            if (node && node.hashCode === hashCode) {
                let curr = node;
                while (curr !== null) {
                    if (curr.key === key) {
                        return true;
                    }
                    curr = curr.next;
                }
            }            
        }
        return false;
    }

    remove(key) {
        let hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.buckets.length) { //places bounds on the buckets
            throw new Error("Trying to access index out of bound");
        }
        for (let i = 0; i <= this.buckets.length; i++) {
            let node = this.buckets[i];
            if (node && node.hashCode === hashCode) {
                let curr = node;
                if (curr.key === key) {
                    if (curr === node && curr.next === null){ //if first node in the bucket
                        this.buckets[i] = curr.next;
                    }
                    else {
                        while (curr !== null) {
                            if ()
                            curr = curr.next;
                        }
                        
                    }
                    return true;
                }
                curr = curr.next;
            }            
        }
        return false;
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
//test.set('moon', 'silver');

console.log(test.buckets);
console.log(test.bucketLimit);
console.log(test.capacity);
console.log(test.get('hat'));
console.log(test.has('lion'));