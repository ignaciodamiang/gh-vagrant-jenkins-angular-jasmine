# create ssh-keygen without interactive prompt

import os
import subprocess

def main():
    if not os.path.exists("/home/vagrant/.ssh/id_rsa"):
        subprocess.call("ssh-keygen -t rsa -f /home/vagrant/.ssh/id_rsa -N ''", shell=True)

if __name__ == "__main__":
    main()