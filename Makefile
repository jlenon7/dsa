test:
	node --no-warnings --enable-source-maps --import=@athenna/tsconfig bin/test.ts

lint:
	eslint {bin,src,tests}/**/*.ts --fix

