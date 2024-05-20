build:
	mkdir -p python
	cp -r .venv/lib python
	zip -mr "layer.zip" python
