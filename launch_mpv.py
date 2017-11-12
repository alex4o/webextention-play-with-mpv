#!/usr/bin/python -u
# Note that running python with the `-u` flag is required on Windows,
# in order to ensure that stdin and stdout are opened in binary, rather
# than text, mode.

import os, subprocess, sys, json, struct, traceback

# Read a message from stdin and decode it.
def getMessage():
	rawLength = sys.stdin.buffer.read(4)
	if len(rawLength) == 0:
			sys.exit(0)
	messageLength = struct.unpack('@I', rawLength)[0]
	message = sys.stdin.buffer.read(messageLength)
	return json.loads(message)

# Encode a message for transmission, given its content.
def encodeMessage(messageContent):
	encodedContent = json.dumps(messageContent)
	encodedLength = struct.pack('@I', len(encodedContent))
	return {'length': encodedLength, 'content': encodedContent}

# Send an encoded message to stdout.
def sendMessage(encodedMessage):
	sys.stdout.buffer.write(encodedMessage['length'])
	sys.stdout.write(encodedMessage['content'])
	sys.stdout.flush()

def main(file):
	while True:
		receivedMessage = getMessage()
		# os.fork()
		file.write("{}\n".format(receivedMessage) )

		proc = subprocess.Popen(["mpv", receivedMessage], stdout=file)

		file.flush()
		if (receivedMessage == "ping"):
			sendMessage(encodeMessage("pong"))

with open("./log.txt", "w+") as file:
	try:
		main(file)
	except Exception as ex:
		traceback.print_exc(file=file)
