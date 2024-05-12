class HashNode {
    constructor(key, value){
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMap {
    constructor(){
        this.buckets = new Array(16);
        this.loadFactor = 0.75;
        this.capacity = 0;
        this.size = 0;
    }

    hash(key){
        let hashCode = 0;
        let prime = 31;
        for(let i = 0; i < key.length; i++){
            hashCode = (hashCode * prime) + key.charCodeAt(i);
        } 
        return hashCode;
    }

    set(key, value){
        const hashKeyIndex = this.hash(key) % this.buckets.length;
        if(!this.buckets[hashKeyIndex]){
            this.buckets[hashKeyIndex] = new HashNode(key, value);
        }
        else{
            let currentNode = this.buckets[hashKeyIndex];
            while(currentNode.next){
                currentNode = currentNode.next;
            }
            currentNode.next = new HashNode(key, value);
        }
        this.size++;
    }

    get(key){
        const hashKeyBucketIndex = this.hash(key) % this.buckets.length;
        if(!this.buckets[hashKeyBucketIndex]) return null;
        let currentNode = this.buckets[hashKeyBucketIndex];
        while(currentNode){
            if(currentNode.key === key){
                return currentNode.value;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    has(key){
        return this.get(key) !== null;
    }

    remove(key){
        const hashKeyBucketIndex = this.hash(key) % this.buckets.length;
        if(!this.buckets[hashKeyBucketIndex]){
            return false;
        } 
        let currentNode = this.buckets[hashKeyBucketIndex];
        let previousNode = null;
        while(currentNode){
            if(currentNode.key === key){
                if(!previousNode){
                    this.buckets[hashKeyBucketIndex] = currentNode.next;
                }
                else{
                    previousNode.next = currentNode.next;
                    currentNode.next = null;
                }
                this.size--;
                return true;
            }
            previousNode = currentNode;
            currentNode = currentNode.next;
        }
        return false;
    }

    length(){
        return this.size;
    }

    clear(){
        this.buckets = Array(this.buckets.length);
        this.size = 0;
    }

    keys(){
        const keys = [];
        for(let bucket of this.buckets){
            let currentNode = bucket;
            while(currentNode){
                keys.push(currentNode.key)
                currentNode = currentNode.next;
            }
        }
        return keys;
    }

    values(){
        const values = [];
        for(let bucket of this.buckets){
            let currentNode = bucket;
            while(currentNode){
                values.push(currentNode.value)
                currentNode = currentNode.next;
            }
        }
        return values;
    }

    entries(){
        const entries = [];
        for(let bucket of this.buckets){
            let currentNode = bucket;
            while(currentNode){
                entries.push([currentNode.key, currentNode.value])
                currentNode = currentNode.next;
            }
        }
        return entries;
    }
}

const hashMap = new HashMap();
hashMap.set("apple", "red");
hashMap.set("banana", "yellow");
hashMap.set("Athlete", 'Zulka')
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());
console.log(hashMap.length());
hashMap.remove('apple');
console.log(hashMap.entries());
console.log(hashMap.length());
console.log(hashMap.get('Athlete'))