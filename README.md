# SwiftCart - E-Commerce Website

SwiftCart হলো একটি মডার্ন ই-কমার্স ওয়েবসাইট যেখানে FakeStore API ব্যবহার করে প্রোডাক্ট দেখানো, ক্যাটাগরি ফিল্টার, কার্ট ম্যানেজমেন্ট এবং প্রোডাক্ট ডিটেইলস দেখার সুবিধা আছে।

## Live Link

https://hridoy997.github.io/SwiftCart/

## GitHub Repository

https://github.com/hridoy997/SwiftCart.git

## Technology Stack

- HTML
- CSS (Tailwind CSS + DaisyUI)
- JavaScript (Vanilla)

---

## প্রশ্ন ও উত্তর

### ১) `null` এবং `undefined` এর মধ্যে পার্থক্য কি?

`null` এবং `undefined` দুটোই JavaScript-এ "কোনো মান নেই" বোঝাতে ব্যবহৃত হয়, কিন্তু এদের মধ্যে গুরুত্বপূর্ণ পার্থক্য আছে।

**`undefined`** হলো এমন একটি মান যেটা JavaScript নিজে থেকেই সেট করে যখন কোনো ভেরিয়েবল তৈরি করা হয় কিন্তু কোনো মান দেওয়া হয় না। যেমন:

```js
let name;
console.log(name); // undefined
```

এখানে আমরা `name` ভেরিয়েবল তৈরি করেছি কিন্তু কোনো মান দিইনি, তাই JavaScript নিজে থেকে এটাকে `undefined` করে দিয়েছে।

**`null`** হলো একটি মান যেটা প্রোগ্রামার নিজে ইচ্ছাকৃতভাবে সেট করে বোঝাতে যে "এখানে কোনো মান নেই"। যেমন:

```js
let user = null;
console.log(user); // null
```

এখানে আমরা ইচ্ছাকৃতভাবে বলছি যে `user` এর কোনো মান নেই।

আরেকটি পার্থক্য হলো - `typeof undefined` দেয় `"undefined"`, কিন্তু `typeof null` দেয় `"object"` (এটা JavaScript-এর একটি পুরনো বাগ)।

---

### ২) JavaScript-এ `map()` ফাংশনের কাজ কি? এটি `forEach()` থেকে কিভাবে আলাদা?

**`map()`** হলো একটি অ্যারে মেথড যেটা মূল অ্যারের প্রতিটি উপাদানের উপর একটি ফাংশন চালায় এবং একটি **নতুন অ্যারে** রিটার্ন করে। মূল অ্যারে পরিবর্তন হয় না।

```js
const numbers = [1, 2, 3];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6]
```

**`forEach()`** ও প্রতিটি উপাদানের উপর ফাংশন চালায়, কিন্তু এটা **কিছু রিটার্ন করে না** (`undefined` রিটার্ন করে)। এটা শুধু কাজ করে, নতুন অ্যারে তৈরি করে না।

```js
const numbers = [1, 2, 3];
numbers.forEach((num) => console.log(num * 2)); // শুধু প্রিন্ট করে
```

**মূল পার্থক্য:**
| বিষয় | `map()` | `forEach()` |
|-------|---------|-------------|
| রিটার্ন | নতুন অ্যারে রিটার্ন করে | `undefined` রিটার্ন করে |
| চেইনিং | `.filter()`, `.reduce()` ইত্যাদির সাথে চেইন করা যায় | চেইন করা যায় না |
| ব্যবহার | ডেটা ট্রান্সফর্ম করতে | শুধু কাজ (side effect) করতে |

---

### ৩) `==` এবং `===` এর মধ্যে পার্থক্য কি?

**`==` (Loose Equality / Abstract Equality):**
এটা দুটি মান তুলনা করার সময় **টাইপ কনভার্সন** (type coercion) করে। মানে, যদি দুই পাশের ডেটা টাইপ আলাদা হয়, JavaScript চেষ্টা করবে একটাকে অন্যটার টাইপে পরিবর্তন করে তুলনা করতে।

```js
console.log(5 == "5"); // true (string "5" কে number 5 এ কনভার্ট করে)
console.log(0 == false); // true (false কে 0 এ কনভার্ট করে)
console.log(null == undefined); // true
```

**`===` (Strict Equality):**
এটা **টাইপ কনভার্সন করে না**। মান এবং ডেটা টাইপ দুটোই এক হতে হবে `true` পেতে।

```js
console.log(5 === "5"); // false (number ≠ string)
console.log(0 === false); // false (number ≠ boolean)
console.log(null === undefined); // false
```

সবসময় `===` ব্যবহার করা ভালো কারণ এটা অপ্রত্যাশিত বাগ এড়াতে সাহায্য করে।

---

### ৪) API থেকে ডেটা আনার ক্ষেত্রে `async`/`await` এর গুরুত্ব কি?

API থেকে ডেটা আনা একটি **অ্যাসিনক্রোনাস** (asynchronous) কাজ — মানে এটা সাথে সাথে শেষ হয় না, সার্ভার থেকে রেসপন্স আসতে কিছুটা সময় লাগে। এই সময়ে বাকি কোড চলতে থাকে।

**`async`/`await`** ব্যবহার করলে অ্যাসিনক্রোনাস কোডকে সিনক্রোনাস কোডের মতো পড়া এবং লেখা যায়, যেটা কোড অনেক পরিষ্কার এবং বোঝা সহজ করে দেয়।

**`async`** কীওয়ার্ড একটি ফাংশনকে অ্যাসিনক্রোনাস ফাংশন বানায়, আর **`await`** কীওয়ার্ড একটি Promise সম্পূর্ণ হওয়া পর্যন্ত অপেক্ষা করে।

```js
// async/await দিয়ে
async function loadProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  console.log(data);
}

// Promise .then() দিয়ে (আগের পদ্ধতি)
function loadProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => console.log(data));
}
```

`async`/`await` এর সুবিধা:

- কোড পড়তে সহজ ও পরিষ্কার
- `try/catch` দিয়ে সহজে এরর হ্যান্ডলিং করা যায়
- নেস্টেড `.then()` চেইনের ঝামেলা থেকে মুক্তি

---

### ৫) JavaScript-এ Scope (Global, Function, Block) এর ধারণা ব্যাখ্যা করো।

**Scope** হলো একটি ভেরিয়েবল কোথায় থেকে অ্যাক্সেস করা যাবে তার সীমানা। JavaScript-এ তিন ধরনের Scope আছে:

**১. Global Scope (গ্লোবাল স্কোপ):**
যখন কোনো ভেরিয়েবল ফাংশন বা ব্লকের বাইরে ঘোষণা করা হয়, তখন সেটা গ্লোবাল স্কোপে থাকে। এটা কোডের যেকোনো জায়গা থেকে অ্যাক্সেস করা যায়।

```js
let siteName = "SwiftCart"; // গ্লোবাল স্কোপ

function showName() {
  console.log(siteName); // অ্যাক্সেস করা যায়
}
```

**২. Function Scope (ফাংশন স্কোপ):**
ফাংশনের ভেতরে ঘোষণা করা ভেরিয়েবল শুধুমাত্র সেই ফাংশনের ভেতরেই অ্যাক্সেস করা যায়। বাইরে থেকে অ্যাক্সেস করা যায় না। `var`, `let`, `const` সবই ফাংশন স্কোপে কাজ করে।

```js
function calculate() {
  let total = 100; // ফাংশন স্কোপ
  console.log(total); // কাজ করবে
}
console.log(total); // এরর! বাইরে থেকে অ্যাক্সেস করা যায় না
```

**৩. Block Scope (ব্লক স্কোপ):**
`let` এবং `const` দিয়ে ঘোষণা করা ভেরিয়েবল `{}` (curly braces) ব্লকের মধ্যে সীমাবদ্ধ থাকে — যেমন `if`, `for`, `while` ব্লক। কিন্তু `var` ব্লক স্কোপ মানে না।

```js
if (true) {
  let x = 10; // ব্লক স্কোপ — শুধু if ব্লকের ভেতরে
  const y = 20; // ব্লক স্কোপ
  var z = 30; // ফাংশন স্কোপ — ব্লকের বাইরেও অ্যাক্সেস করা যাবে
}

console.log(z); // 30 (কাজ করবে)
console.log(x); // এরর! ব্লকের বাইরে অ্যাক্সেস করা যায় না
```

তাই সবসময় `let` এবং `const` ব্যবহার করা ভালো কারণ এগুলো ব্লক স্কোপ মেনে চলে এবং অপ্রত্যাশিত বাগ কমায়।
