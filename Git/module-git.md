# Git flow

Không nên làm trực tiếp trên main nên `checkout` ra nhánh khác để dev feature mới.

0. kiểm tra remote: git remote -v
1. git status để kiểm tra
2. git add .
3. git commit -m '#[id] - message' update những cập nhật
4. git push origin < branch name >
5. kéo code về máy: git pull origin < branch name >

## Tạo branch mới

git checkout -b < branch name >

## Tạo pull request

review và comment đẩy lai code cho cái pull request mới tạo

1. git add .
2. git commit --amend : những thay đổi mới sẽ được cập nhật vào commit mới
3. wq -> enter
4. git push origin < branch name > -f

Merge xong branch, có thể xóa branch cho gọn

Phải kéo code mới về -> trở về nhánh chính. `git pull origin master`

Khi làm xong tính năng xóa branch dưới local để khỏi rác.

## Lấy lại code

1. `git reflog --no-abbrev`: xóa nhầm branch để lấy lại code
2. `git log --oneline -n5`: lấy 5 log gần nhất

## Fork - work

Fork dự án về, sau đó clone về máy. Add remote vào direction.

- git remote add < remote name > url

Push commit lên theo commit cá nhân (fork)

## Tạo pull request từ repo cty

## Xử lý conflict

1. git add .
2. git rebase --continue
3. git commit --amend
