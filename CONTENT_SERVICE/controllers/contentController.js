
// Mock database (array of contents for now)
let contents = [];

// Controller functions
exports.getAllContents = (req, res) => {
    res.status(200).json(contents);
};

exports.getContentById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const content = contents.find(c => c.id === id);
    if (content) {
        res.status(200).json(content);
    } else {
        res.status(404).json({ message: 'Content not found' });
    }
};

exports.createContent = (req, res) => {
    const newContent = {
        id: contents.length + 1,
        ...req.body
    };
    contents.push(newContent);
    res.status(201).json(newContent);
};

exports.updateContent = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = contents.findIndex(c => c.id === id);
    if (index !== -1) {
        contents[index] = { id, ...req.body };
        res.status(200).json(contents[index]);
    } else {
        res.status(404).json({ message: 'Content not found' });
    }
};

exports.deleteContent = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = contents.findIndex(c => c.id === id);
    if (index !== -1) {
        contents.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Content not found' });
    }
};
