# Проанализировать скорость и сложность одного любого алгоритма из разработанных в рамках домашнего задания первых трех уроков.
# Примечание. Идеальным решением будет:
# ● выбрать хорошую задачу, которую имеет смысл оценивать (укажите в комментарии какую задачу вы взяли),
# ● написать 3 варианта кода (один у вас уже есть),
# ● проанализировать 3 варианта и выбрать оптимальный,
# ● результаты анализа вставить в виде комментариев в файл с кодом (не забудьте указать, для каких N вы проводили замеры),
# ● написать общий вывод: какой из трёх вариантов лучше и почему.

# Берём за основу DZ2-3
# Сформировать из введенного числа обратное по порядку входящих в него цифр и вывести на экран.
# Например, если введено число 3486, надо вывести 6843

# input меняем на генератор числа
# загоняем исходный код в цикл для увеличения времени исполнения... (хоть "каминю" и 10 лет, но до сих пор шутсрый)

import random as rnd
import timeit as ti
import cProfile


def variant1(r):
    for _ in range(r):
        n = rnd.randint(1_000_000_000_000_000, 9_999_999_999_999_999)  # генерим число
        k = 0
        while n > 0:  # идём по циклу пока есть от чего откусывать
            d = n % 10  # получаем цифру младшего разряда числа
            k = (k + d) * 10  # прибавляем полученную цифру и умножаем на 10 (увеличиваем разрядность)
            n //= 10  # уменьшаем число в 10 раз
        k = int(k / 10)  # корректируем последний (лишний) шаг умножения
    return


cProfile.run('variant2(100000)')


#       500081 function calls in 0.425 seconds
# Ordered by: standard name
# ncalls  tottime  percall  cumtime  percall filename:lineno(function)
#      1    0.000    0.000    0.425    0.425 <string>:1(<module>)
#      1    0.158    0.158    0.425    0.425 DZ4-1.py:33(variant2)
# 100000    0.102    0.000    0.206    0.000 random.py:200(randrange)
# 100000    0.061    0.000    0.267    0.000 random.py:244(randint)
# 100000    0.069    0.000    0.105    0.000 random.py:250(_randbelow_with_getrandbits)
#      1    0.000    0.000    0.425    0.425 {built-in method builtins.exec}
# 100000    0.015    0.000    0.015    0.000 {method 'bit_length' of 'int' objects}
#      1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
# 100077    0.021    0.000    0.021    0.000 {method 'getrandbits' of '_random.Random' objects}

def variant2(r):
    for _ in range(r):
        n = rnd.randint(1_000_000_000_000_000, 9_999_999_999_999_999)  # генерим число
        s = str(n)  # преобразовываем в строку для возможности итерации (перебора) знаков
        s = s[::-1]  # разворот строки через срез
        k = int(s)  # приводим строку к числу, т.к. на выходе должно быть число
    return


cProfile.run('variant1(100000)')


#       500091 function calls in 1.045 seconds
# Ordered by: standard name
# ncalls  tottime  percall  cumtime  percall filename:lineno(function)
#      1    0.000    0.000    1.045    1.045 <string>:1(<module>)
#      1    0.769    0.769    1.045    1.045 DZ4-1.py:21(variant1)
# 100000    0.107    0.000    0.213    0.000 random.py:200(randrange)
# 100000    0.062    0.000    0.276    0.000 random.py:244(randint)
# 100000    0.069    0.000    0.107    0.000 random.py:250(_randbelow_with_getrandbits)
#      1    0.000    0.000    1.045    1.045 {built-in method builtins.exec}
# 100000    0.015    0.000    0.015    0.000 {method 'bit_length' of 'int' objects}
#      1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
# 100087    0.023    0.000    0.023    0.000 {method 'getrandbits' of '_random.Random' objects}

def variant3(r):
    for _ in range(r):
        n = rnd.randint(1_000_000_000_000_000, 9_999_999_999_999_999)  # генерим число
        s = str(n)  # преобразовываем в строку для возможности итерации (перебора) знаков
        l = list(s)  # приводим строку к изменяемому списку
        s = ''.join(reversed(l))  # переворачиваем список и объединяем его в строку
        k = int(s)  # приводим строку к числу, т.к. на выходе должно быть число
    return


cProfile.run('variant3(100000)')
#          600101 function calls in 0.611 seconds
#    Ordered by: standard name
#    ncalls  tottime  percall  cumtime  percall filename:lineno(function)
#         1    0.000    0.000    0.611    0.611 <string>:1(<module>)
#         1    0.247    0.247    0.611    0.611 DZ4-1.py:42(variant3)
#    100000    0.110    0.000    0.223    0.000 random.py:200(randrange)
#    100000    0.063    0.000    0.285    0.000 random.py:244(randint)
#    100000    0.073    0.000    0.113    0.000 random.py:250(_randbelow_with_getrandbits)
#         1    0.000    0.000    0.611    0.611 {built-in method builtins.exec}
#    100000    0.016    0.000    0.016    0.000 {method 'bit_length' of 'int' objects}
#         1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
#    100097    0.023    0.000    0.023    0.000 {method 'getrandbits' of '_random.Random' objects}
#    100000    0.078    0.000    0.078    0.000 {method 'join' of 'str' objects}

# прогоняем все варианты преобразования числа в цикле, от 100 до 9900 переобразований
for i in range(100, 10000, 100):
    print('v1', i, ti.timeit('variant1(i)', number=100, globals=globals()))
    print('v2', i, ti.timeit('variant2(i)', number=100, globals=globals()))
    print('v3', i, ti.timeit('variant3(i)', number=100, globals=globals()))
# полученные данные перенесём в Excel для построения графика
# Диаграмма тут https://drive.google.com/file/d/1LNVKkZCoqQYfDZYqLt4R4mt0D7Gv5c3H/view?usp=sharing

# Судя по графику самым быстрым является вариант номер 2, реализованный через срез строки,
# в котором по идёт пересылка последовательных ячеек из конца строки в начало.
# Хотя все три алгоритма имеют линейную (константную) зависимоссть времени исполнения от нагрузки, но вариант 1
# почти в 3 раза медленнее...
