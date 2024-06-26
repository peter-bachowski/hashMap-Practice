class HashMap {
    
    bucketLimit = 16;
    buckets = Array(this.bucketLimit);
    loadFactor = 0.75;

    hash(key) {
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i))%16;
        }
        
        return hashCode;
    } 

    set(key, value) {
        let hashCode = this.hash(key);
        let newData = new Node(hashCode, value);

        if (!this.buckets.hasOwnProperty(hashCode)) {
            this.buckets[hashCode] = newData;
        }
        else {
            this.buckets[hashCode].next = newData;
        }
        
        // if (index < 0 || index >= buckets.length) {
        //     throw new Error("Trying to access index out of bound");
        // }
        console.log(this.buckets);
    }
     
}

class Node {
    constructor (hashCode, value, next = null) {
        this.hashCode = hashCode;
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

console.log(test.buckets);