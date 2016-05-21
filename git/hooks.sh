#!/bin/bash
rm ./.git/hooks/pre-commit
ln -s ./git/hooks/pre-commit ./.git/hooks/pre-commit