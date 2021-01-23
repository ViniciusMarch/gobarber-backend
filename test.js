let t = 0;

t = a(t)

console.log(t);


function a(t) {
  for (let index = 0; index < 400; index++) {
    t+=index;

  }
  return t
}
