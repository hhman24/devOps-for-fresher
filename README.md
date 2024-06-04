# Linux

## Cài đặt Ubuntu server

Note: Trong VMware có cài đặt mạng:

* NAT

  * Điểm mạnh: Có thể truy cập từ chính thiết bị đó. Nên dùng khi sử dụng laptop. Cần ghi nhớ địa chỉ gateway Ip của NAT setting.

* Bridge

  * Điểm mạnh: Khi triển khai thành công web. Thì có thể truy cập bằng các thiệt bị nội bộ. Nên dùng khi sử dụng PC

Nên set địa chỉ Ip tĩnh cho server

```bash
sudo -i
```

Lệnh sudo dùng cho user root, có quyền truy cập tối cáo nhất trong hệ thống

```bash
nano /etc/netplan/00-installer-config.yaml
```

Ta thấy được thông tin network: tên card mạng, dhcp, version

Cấu hình lại địa chỉ tĩnh:

```bash
network:
    ethernets:
      ens33:
        dhcp4: false
        addresses: [192.168.14.110/24]
        gateway4: 192.168.14.2
        nameservers:
          addresses: [8.8.8.8,8.8.4.4]
```

Note: Nếu sử dụng NAT thì phải địa chỉ IP là có cùng subnetmask với gateway trong NAT edit>Virtual Machine editor>setting

Sử dụng cấu hình network mới

```bash
netplan apply
```

Kiểm tra kết nối

```bash
ip a
```

Note: chú ý phần tên card mạng mình sử dụng có đúng địa chỉ nãy mình set chưa

Tắt máy. Tạo ra một phiên bản backup snapshot dùng để sử dụng lại, khi bị lỗi không cần cái đặt lại.

Kết nối ssh bằng terminal window

```bash
ssh ainz@192.168.14.10
```

## Các câu lệnh Linux thông dụng

* Cho biết biết vị trí hiện tại.

```bash
pwd
```

* Cho biết phiên user hiện tại.

```bash
whoami
```

* Hệ thống file trong linux.

![file system linux](./images/linux-filesystem.png)

Các loại file mà Linux hỗ trợ

* Filesystem cơ bản: EXT2, EXT3, EXT4, XFS, Btrfs, JFS, NTFS,…
* Filesystem dành cho dạng lưu trữ Flash: thẻ nhớ,…
* Filesystem dành cho hệ cơ sở dữ liệu
* Filesystem mục đích đặc biệt: procfs, sysfs, tmpfs, squashfs, debugfs,…

File system của hệ điều hanh Linux được tổ chức theo tiêu chuẩn cấp bậc của hệ thống tập tin **Filesystem Hierarchy Standard (FHS)**.

Linux dùng `/` để tách các đường dẫn --> (`/`) là thư mục gốc

|Thư mục|Chức năng|
|-------|---------|
| /bin/ | Essential user command binaries |
| /boot/| Static files of the boot loader |
| /dev/ | device files |
| /etc/ | Host specific system configuration required directories: OPT, XII, SGML, SML |
| /home/| User home directory |
| /lib/ | Esseential shared libraries and kernel modules |
|/media/| Mount Point for remmovable media |
| /mnt/ | Mount point for a temporarily mounted filesystem |
| /opt/ | Add-on application software packages |
| /sbin/| System Binaries |
| /srv/ | Data for services provided by this system |
| /tmp/ | Temporary files |
| /usr/ | (Multi)-User utilities and application |
| /var/ | Variable files |
| /root/| Home Directory for the root user |
| /proc/| Virtual filesystem documentting kernel and process status as text files |

* Di chuyển vào các thư mục.

```bash
  
cd /var
// di chuyển tới thư mục var

cd .. 
// di chuyển tới thư mục cha một cấp

cd
// Di chuyển tới vị trí ban đầu
```

* Dùng để list các thư mục, file.

```bash
ls /
// xem các file, thư mục trong /'
'
ls -l /
// xem ds dưới dạng list

ls -a /
// xem các file và thư mục ẩn

ls -t /
// sắp xếp các thư mục, file theo thời gian

ls -lat
// kết hợp các lệnh ở trên
```

* Tạo thư mục, file

```bash
mkdir data
// tạo thư mục data

mkdir -p data/data1/data11
// tạo thư mục theo đường dẫn nếu chưa có sẽ tạo

touch data/data.txt
// tạo file data.txt
```

* Xóa thư mục, file

```bash
rm data/data.txt
// xóa file

rm -r data/data1/data11
// xóa thư mục

rm -rf data/data1
// ép xóa thư mục
```

* Copy thư mục, file

```bash
cp data.txt /tmp/
// copy file data.txt sang /tmp/
```

* Cut thư mục, file

```bash
mv /tmp/data.txt .
// cut data.txt sang thư mục hiện tại

mv /tmp/data.txt data2.txt
// cut data.txt sang thư mục và đổi tên
```

* Ghi vào file và xem

```bash
echo "devops for fresher by elroydevops"
// ghi ra terminal

echo "devops for fresher by elroydevops" > title.txt
// ghi vào file title.txt
cat title.txt
// xem nội dung file title.txt

echo "devops for fresher by elroydevops 1" > title.txt
cat title.txt
// kết quả bị ghi đè

echo "devops for fresher by elroydevops 2" >> title.txt
cat title.txt
// devops for fresher by elroydevops 1
// devops for fresher by elroydevops 2
```

* Xem lại các câu lệnh vừa gõ

```bash
history
```

* Xem được nội dung file

```bash
tail -n 1 title.txt
// lấy dòng cuối cùng

tail -n 1 title.txt > log.txt
// lấy dòng cuối và ghi vào log.txt

tail -f log.txt
// xem trực tiếp dữ liệu realtime
```

* Kiểm tra trạng thái sử dụng RAM trên server

```bash
free -m
```

* Kiểm tra server còn trống bao nhiêu disk

```bash
df -h
```

* Kiểm tra các tiến trình

```bash
top
```

* Thay đổi tên server

```bash
sudo hostnamectl set-hostname new-name
// vì thay đổi tên cần có quyền admin
sudo reboot
// để khởi động lại server

```

* Các câu lệnh quyền admin `sudo -i`

Hiển thị các kết nối server. Nên cài đặt nestat trước `apt install net-tools`.

```bash
netstat -tlpun
```

Notes:

* t: hiển thị kết nối tcp
* l: hiển thị các cổng đang mở và lắng nghe chấp nhận kết nối
* p: hiển thị tiến trình liên quan tới mỗi kết nối
* u: hiển thị kết nối udp
* n: hiển địa chỉ ip/cổng dạng số

Xem các tiến trình trên hệ thống

```bash
ps -ef
```

Kiểm tra kết nối internet

```bash
ping 8.8.8.8
```

check các kết nối -> Để biết server thông đến server khác

```bash
telnet 192.168.1.199 80
```

khi telnet không thành công nhưng có tồn tại server

```bash
traceroute -T -p 80 192.168.1.199
```

## Cách sử dụng VIM

Cài đặt

```bash
sudo apt install vim -y
```

Tạo file và file với VIM

```bash
vi data.txt
```

VIM có 2 chế độ Insert mode nhấn `i` và Command mode nhấn `esc`

Shortcuts:

1. xóa một dòng nhấn `dd`
2. undo nhấn `u`
3. copy nhấn `yy`
4. paste nhấn `p`
5. Lưu nhấn `:x`

## Quyền truy cập

Hãy tưởng tượng trong ngôi nhà có các chủ sở hữu, nhóm sở hữu, nhóm khác. Tình huống đặt ra nếu cấp quyền sai thì ngôi nhà bị kiểm soát hoàn toàn bởi một người nào đó không mong muốn.

Cách tạo user trong hệ thống. Notes: cần quyền user root

```bash
useradd hhman1
adduser hhman2
Adding user `hhman2' ...
Adding new group `hhman2' (1002) ...
Adding new user `hhman2' (1002) with group `hhman2' ...
Creating home directory `/home/hhman2' ...
Copying files from `/etc/skel' ...
```

Thấy sự khác biệt giữa 2 câu lệnh useradd và adduser. useradd chỉ tạo ra user mà không đòi hỏi thêm các phần như adduser

Để chuyển qua user khác dùng

```bash
su hhman1
su hhman2
```

sự khác biệt rõ hơn khi ta thực hiện 2 lệnh trên. KHi thực hiện bằng lệnh adduser ta đã có một user riêng và có thể đăng nhập vào bằng user này.

Xem thông tin của user trong `/etc/passwd`.

Xóa một user

```bash
deluser hhman1
```

Tạo một group

```bash
groupadd devops1
```

Xóa một group

```bash
delgroup devops1
```

Thêm một user vào group

```bash
usermod -aG devops2 hhman2
```

Notes:

* -a: append thêm vào
* -G: liệt kê ds của hhan2. Nếu không sử dụng -G thì hệ thống thêm hhman2 vào devops2 nhưng sẽ xóa tất cả group có hhman2 trước đó

Khi tạo một user mới sẽ tạo ra một group tương ứng của user đó và thêm user vào group đó.

Xem group của một user

```bash
groups manhnv2
```

Phân quyền có hai loại.

* Quyền sở hữu

Tạo thư mục datas

```bash
mkdir datas
touch datas/data1.txt
ls -l datas/
ls -l
```

```bash
total 0
-rw-rw-r-- 1 root root 0 Jun  4 15:04 data1.txt
total 4
drwxrwxr-x 2 root root 4096 Jun  4 15:04 datas
```

Sau khi tạo thành công, xem file vừa tạo. Ở đây, biết được thông tin file `data1.txt` thuộc sở hữu của user root (bên trái) và nhóm root (bên phải).

Câu hỏi đặt ra làm sao thay đổi, quyền người sở hữu:nhóm sở hữu.

```bash
chown root:devops2 datas/
```

Nhưng ta lại muốn thay đổi quyền sở hữu từ cấp cha

```bash
chown -R root:devops2 datas/
```

* Quyền truy cập

Quyền truy cấp trên Linux: rwx (read, write, execute)

```bash
total 8
drwxr-xr-x 2 root devops2 4096 Jun  4 15:16 datas
drwx------ 3 root root    4096 May 28 15:18 snap

total 0
-rw-r--r-- 1 root devops2 0 Jun  4 15:16 data1.txt
```

Kí tự đầu tiên:

* thư mục: d
* file: -

3 kí tự tiếp rwx đại diện người sở hữu có quyền truy cập. 3 kí tự tiếp là quyền của nhóm sở hữu. 3 kí tự tiếp theo cho các bên khác.

```bash
chmod u=rwx,g=rx,o=- datas/

total 8
drwxr-x--- 2 root devops2 4096 Jun  4 15:16 datas
drwx------ 3 root root    4096 May 28 15:18 snap
```

Thay đổi quyền truy cập lần lượt của user(u) group(u) other(o)

Notes: Trong linux, để tác động tới một file thư mục phải có ít nhất quyền thực thi.

Có cách khác để phân quyền. r=4,w=2,x=1 ==> 4+2+1=7

```bash
chmod 750
```

Thay đổi quyền người sở hữu full quyền, nhóm sở hữu rx, other không có quyền nào
